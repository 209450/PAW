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

namespace Controllers
{
    [Authorize]
    [ApiController]
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
            var graphqlResult = await _graphqlAdapter.ExecuteToJsonAsync(query, cancellationToken);

            return Ok(graphqlResult);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody]GraphQLRequest queryRequest, CancellationToken cancellationToken)
        {
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
    }

    public class GraphQLRequest
    {
        public string OperationName { get; set; }
        public string Query { get; set; }
        public JObject Variables { get; set; }
    }
}
