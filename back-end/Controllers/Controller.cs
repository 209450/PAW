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

namespace Controllers
{
    [Route("api/graphql")]
    public class GraphqlController : Controller
    {
        private IGraphqlAdapter _graphqlAdapter;

        public GraphqlController(IGraphqlAdapter graphqlAdapter)
        {
            _graphqlAdapter = graphqlAdapter;
        }

        [HttpGet("{query}")]
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
