using System;
using GraphQL;
using GraphQL.Types;

public class Hello
{
    public String getHello()
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
}

