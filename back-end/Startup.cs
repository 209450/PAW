using System.Configuration;
using System.Data;
using System.IO;
using System.Text;
using back_end.Helpers;
using back_end.Mutations;
using back_end.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using NReco.Data;
using NReco.GraphQL;
using NReco.GraphQL.Configuration;
using NReco.GraphQL.Schemas;

namespace back_end
{
    public class Startup
    {
        private readonly string allowedOrigins = "_allowedOrigins";
        private readonly AppSettings _appSettings;


        public Startup(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            services.AddMvc().AddNewtonsoftJson();
            services.AddCors(options =>
            {
                options.AddPolicy(allowedOrigins,
                    builder =>
                    {
                        builder.WithOrigins("front-end");
                    });
            });
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("Ni3-Wi3M_J4K_T3N-Kl00cZ_M4_VVyGl0ND4C-Pr053-MnI3-Z05T4VVIC")),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
            services.AddSingleton<IDbFactory, DbFactory>((servicePrv) =>
            {
                // db-provider specific configuration code:
                return new DbFactory(MySql.Data.MySqlClient.MySqlClientFactory.Instance)
                {
                    LastInsertIdSelectText = "SELECT LAST_INSERT_ID()"
                };
            });
            services.AddSingleton<IDbCommandBuilder, DbCommandBuilder>((servicePrv) =>
            {
                var dbCmdBuilder = new DbCommandBuilder(servicePrv.GetRequiredService<IDbFactory>());
                dbCmdBuilder.SelectTemplate = "SELECT @columns FROM @table@where[ WHERE {0}]@orderby[ ORDER BY {0}] @recordcount[LIMIT {0}] @recordoffset[OFFSET {0}]";
                // initialize dataviews here:
                return dbCmdBuilder;
            });
            services.AddScoped<IDbConnection>((servicePrv) =>
            {
                var dbFactory = servicePrv.GetRequiredService<IDbFactory>();
                var conn = dbFactory.CreateConnection();
                conn.ConnectionString = string.Format("Server=database;Port=3306;Database=trello;Uid=root;Pwd=123;", _appSettings.Server, _appSettings.Port, _appSettings.Database, _appSettings.Uid, _appSettings.Pwd);//String.Format("Filename={0}", Path.Combine(ApplicationPath, "../Data/northwind.db"));
                return conn;
            });
            services.AddScoped<DbDataAdapter>();
            services.AddScoped<IUserService, UserService>();
            // configure schema via json-file
            services.AddScoped<IGraphqlAdapter>((servicePrv) =>
            {
                var dbAdapter = servicePrv.GetRequiredService<DbDataAdapter>();
                var graphqlAdapter = new GraphqlDbAdapter(
                  dbAdapter,
                  JsonConvert.DeserializeObject<GraphqlConfiguration>(
                    File.ReadAllText("schemaDbDefinition.json")//Path.Combine(ApplicationPath, "schemaDbDefinition.json"))
                  ), new GraphqlSchemaOption
                  {
                      MutationSchema = new MutationSchema(dbAdapter)
                  }
                ) ;
                return graphqlAdapter;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseRouting();
            app.UseCors(allowedOrigins);
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

        }
    }
}
