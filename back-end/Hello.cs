using System;
using System.Threading;
using System.Threading.Tasks;
using GraphQL;
using GraphQL.Types;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using NReco.GraphQL;
using System.Net.Http;

public class Hello
{
    private GraphqlDbAdapter graphqlDbAdapter;

    public GraphqlDbAdapter GraphqlDbAdapter { get => graphqlDbAdapter; set => graphqlDbAdapter = value; }

    public String GetHello()
    {
        var schema = Schema.For(@"
        type Query {
            hello: String
        }
        ");
        var json = schema.Execute(_ =>
        {
            _.Query = "{ hello }";
            _.Root = new { Hello = "Hello World!" };
        });
        return json;
    }

    public class GraphQLRequest
    {
        public string OperationName { get; set; }
        public string Query { get; set; }
        public JObject Variables { get; set; }
    }

    [HttpPost]
    public async Task<IActionResult> PostAsync([FromBody]GraphQLRequest queryRequest, CancellationToken cancellationToken)
    {
        Console.WriteLine("test");
        var graphqlResult = await graphqlDbAdapter.ExecuteToJsonAsync(
            new GraphQLQuery
            {
                Query = queryRequest.Query,
                OperationName = queryRequest.OperationName,
                Variables = queryRequest.Variables.ToInputs()
            },
            cancellationToken
        );
        return new OkObjectResult(graphqlResult);
    }
}

