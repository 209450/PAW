using System.Data;
using System.IO;
using back_end.Mutations;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using NReco.Data;
using NReco.GraphQL;
using NReco.GraphQL.Configuration;
using NReco.GraphQL.Schemas;

namespace back_end
{
    public class Startup
    {   

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            services.AddMvc().AddNewtonsoftJson();
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
                conn.ConnectionString = "Server=database;Port=3306;Database=trello;Uid=root;Pwd=123;";//String.Format("Filename={0}", Path.Combine(ApplicationPath, "../Data/northwind.db"));
                return conn;
            });
            services.AddScoped<DbDataAdapter>();
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
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

        }
    }
}
