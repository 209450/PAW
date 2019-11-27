using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Mutations.Types
{
    public class UserInputType : InputObjectGraphType
    {
        public UserInputType()
        {
            Name = "UserInputType";
            Field<NonNullGraphType<StringGraphType>>("id");
            Field<StringGraphType>("name");
            Field<StringGraphType>("password");
        }
    }
}
