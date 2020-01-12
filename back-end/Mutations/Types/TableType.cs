using GraphQL.Types;
using GraphQL.Authorization;
using Mutations.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Mutations.Types
{
    public class TableType : ObjectGraphType<Table>, IProvideMetadata
    {
        public TableType()
        {
            this.AuthorizeWith("UserPolicy");

            Name = "Table";

            Field(h => h.Id, nullable: false).Description("Table id").AuthorizeWith("UserPolicy");
            Field(h => h.Name, nullable: false).Description("Table name").AuthorizeWith("UserPolicy");
            Field(h => h.Board_id, nullable: false).Description("Id of board that this table belongs to").AuthorizeWith("UserPolicy");
        }
    }
}
