using back_end.Mutations.Types;
using GraphQL.Types;
using Mutations.Tables;
using NReco.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Mutations
{
    public class MutationSchema : ObjectGraphType
    {
        public MutationSchema(DbDataAdapter dbAdapter)
        {
            Field<UserType>(
                "updateUser",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<UserInputType>> { Name = "data" }),
                resolve: context =>
                {
                    var user = context.GetArgument<User>("data");

                    dbAdapter.Update(
                        new Query("Users", (QField)"Id" == new QConst(user.Id)),
                        user
                        );
                    return user;
                }
            );
            Field<UserType>(
                "addUser",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<UserInputType>> { Name = "data" }),
                resolve: context =>
                {
                    var user = context.GetArgument<User>("data");

                    dbAdapter.Insert(
                        "Users", user
                        );
                    return user;
                }
            );
            Field<UserType>(
                "deleteUser",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<UserInputType>> { Name = "data" }),
                resolve: context =>
                {
                    var user = context.GetArgument<User>("data");

                    dbAdapter.Delete(
                        new Query("Users", (QField)"Id" == new QConst(user.Id))
                        );
                    return user;
                }
            );
        }
    }

}
