using GraphQL.Types;
using GraphQL.Authorization;
using Mutations.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Mutations.Types
{
    public class UserType : ObjectGraphType<User>, IProvideMetadata
    {
        public UserType()
        {
            this.AuthorizeWith("UserPolicy");
            Name = "User";

            Field(h => h.Id, nullable: false).Description("User id").AuthorizeWith("UserPolicy");
            Field(h => h.Name, nullable: false).Description("User nickname").AuthorizeWith("UserPolicy");
            Field(h => h.Password, nullable: false).Description("User's password").AuthorizeWith("UserPolicy");
        }
    }
}
