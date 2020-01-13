using System;
using System.Threading;
using System.Threading.Tasks;
using GraphQL;
using GraphQL.Types;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using NReco.GraphQL;
using System.Net.Http;
using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using back_end.Models;
using back_end.Services;
using System.Linq;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;
using GraphQLParser;
using GraphQL.Validation;
using back_end.Mutations.Types;

namespace Controllers
{
    [Authorize]
    [Route("api/graphql")]
    public class GraphqlController : Controller
    {
        private IGraphqlAdapter _graphqlAdapter;
        private IUserService _userService;

        public GraphqlController(IGraphqlAdapter graphqlAdapter, IUserService userService)
        {
            _graphqlAdapter = graphqlAdapter;
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("Authenticate")]
        public IActionResult Authenticate([FromBody]AuthenticateModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "Invalid Model" });
            var user = _userService.Authenticate(model.Username, model.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync(string query, CancellationToken cancellationToken)
        {
            HttpContext.Request.Headers.TryGetValue("Bearer", out var token);
            var jwtToken = new JwtSecurityToken(token);
            var claims = jwtToken.Claims.Where(c => c.Type.ToString() == "unique_name").Select(c => c.Value).SingleOrDefault();
            if (claims != getUserName(query))
                return StatusCode(403, "Odmowa dostepu");

            //var lexer = new Lexer();
            //var queryUserName = lexer.Lex(new Source(query)).GetPropertyValue("user").GetValue();

            //JObject temp = JObject.Parse(query);
            //Console.WriteLine("elo bulwy: " + temp["user"]["name"]);
            //Console.WriteLine("Kuery: " + query); //GRAPHQL DOTNET PARSER
            /*var executor = new DocumentExecuter();
            var result = await executor.ExecuteAsync(new ExecutionOptions{
                Query = query,
                ValidationRules = DocumentValidator.CoreRules().Concat(new[] { new QueryChecker() })
            });*/
            
            var graphqlResult = await _graphqlAdapter.ExecuteToJsonAsync(query, cancellationToken);

            return Ok(graphqlResult);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody]GraphQLRequest queryRequest, CancellationToken cancellationToken)
        {
            HttpContext.Request.Headers.TryGetValue("Bearer", out var token);
            var jwtToken = new JwtSecurityToken(token);
            var claims = jwtToken.Claims.Where(c => c.Type.ToString() == "unique_name").Select(c => c.Value).SingleOrDefault();
            if (claims != getUserName(queryRequest.Query))
                return StatusCode(403, "Odmowa dostepu");
            
            var graphqlResult = await _graphqlAdapter.ExecuteToJsonAsync(
                new GraphQLQuery
                {
                    Query = queryRequest.Query,
                    OperationName = queryRequest.OperationName,
                    Variables = queryRequest.Variables.ToInputs()
                },
                cancellationToken
            );
            return Ok(graphqlResult);
        }

        private String getUserName(string query)
        {
            int Start, End;
            if (query.Contains("user") && query.Contains("name:") && query.Contains(")"))
            {
                Start = query.IndexOf("name:", 0) + "name:".Length;
                End = query.IndexOf(")", Start);
                String result = query.Substring(Start, End - Start);
                return result.Trim().Trim('"');
            }
            else
            {
                return "";
            }
        }
    }

    public class GraphQLRequest
    {
        public string OperationName { get; set; }
        public string Query { get; set; }
        public JObject Variables { get; set; }
    }
}
