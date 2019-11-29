using GraphQL.Types;
using Mutations.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Mutations.Types
{
    public class TableType : ObjectGraphType<Table>
    {
        public TableType()
        {
            Name = "Board";

            Field(h => h.Id, nullable: false).Description("Table id");
            Field(h => h.Name, nullable: false).Description("Table name");
            Field(h => h.Board_id, nullable: false).Description("Id of board that this table belongs to");
        }
    }
}
