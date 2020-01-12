using GraphQL.Validation;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace back_end.AuthHelpers
{
    class GraphQLSetting
    {
        public Func<HttpContext, Task<GraphQLUserContext>> BuildUserContext { get; set; }
        public object Root { get; set; }
        public List<IValidationRule> ValidationRules { get; } = new List<IValidationRule>();
        public PathString GraphQLPath { get; set; }
        public bool EnableMetrics { get; set; }
        public bool ExposeExceptions { get; set; }
    }
}
