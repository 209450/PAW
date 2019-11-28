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
            Field<StringGraphType>("Id");
            Field<StringGraphType>("Name");
            Field<StringGraphType>("Password");
        }
    }
}
