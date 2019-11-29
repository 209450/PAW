using GraphQL.Types;
using Mutations.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Mutations.Types
{
    public class BoardType : ObjectGraphType<Board>
    {
        public BoardType()
        {
            Name = "Board";

            Field(h => h.Id, nullable: false).Description("Board id");
            Field(h => h.Name, nullable: false).Description("Board name");
            Field(h => h.Owner, nullable: false).Description("Board owner");
        }
    }
}
