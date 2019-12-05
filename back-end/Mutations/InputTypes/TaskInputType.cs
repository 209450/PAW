using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Mutations.Types
{
    public class TaskInputType : InputObjectGraphType
    {
        public TaskInputType()
        {
            Name = "TaskInputType";
            Field<StringGraphType>("Id");
            Field<StringGraphType>("Name");
            Field<StringGraphType>("Table_id");
        }
    }
}
