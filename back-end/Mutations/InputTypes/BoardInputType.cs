using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Mutations.Types
{
    public class BoardInputType : InputObjectGraphType
    {
        public BoardInputType()
        {
            Name = "BoardInputType";
            Field<StringGraphType>("Id");
            Field<StringGraphType>("Name");
            Field<StringGraphType>("Owner");
        }
    }
}
