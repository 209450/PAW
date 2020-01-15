using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Mutations.Types
{
    public class TableInputType : InputObjectGraphType
    {
        public TableInputType()
        {
            Name = "TableInputType";
            Field<StringGraphType>("Id");
            Field<StringGraphType>("Name");
            Field<StringGraphType>("Board_id");
        }
    }
}
