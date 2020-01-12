using GraphQL.Types;
using GraphQL.Authorization;
using Mutations.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Mutations.Types
{
    public class BoardType : ObjectGraphType<Board>, IProvideMetadata
    {
        public BoardType()
        {
            this.AuthorizeWith("UserPolicy");

            Name = "Board";

            Field(h => h.Id, nullable: false).Description("Board id").AuthorizeWith("UserPolicy");
            Field(h => h.Name, nullable: false).Description("Board name").AuthorizeWith("UserPolicy");
            Field(h => h.Owner, nullable: false).Description("Board owner").AuthorizeWith("UserPolicy");
        }
    }
}
