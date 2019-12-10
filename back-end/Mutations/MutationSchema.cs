using back_end.Mutations.Types;
using GraphQL.Types;
using Mutations.Tables;
using NReco.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Task = Mutations.Tables.Task;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;

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
            Field<BoardType>(
                "updateBoard",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<BoardInputType>> { Name = "data" }),
                resolve: context =>
                {
                    var board = context.GetArgument<Board>("data");

                    dbAdapter.Update(
                        new Query("Boards", (QField)"Id" == new QConst(board.Id)),
                        board
                        );
                    return board;
                }
            );
            Field<BoardType>(
                "addBoard",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<BoardInputType>> { Name = "data" }),
                resolve: context =>
                {
                    var board = context.GetArgument<Board>("data");

                    dbAdapter.Insert(
                        "Boards", board
                        );
                    return board;
                }
            );
            Field<BoardType>(
                "deleteBoard",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<BoardInputType>> { Name = "data" }),
                resolve: context =>
                {
                    var board = context.GetArgument<Board>("data");

                    dbAdapter.Delete(
                        new Query("Boards", (QField)"Id" == new QConst(board.Id))
                        );
                    return board;
                }
            );
            Field<TableType>(
                "updateTable",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<TableInputType>> { Name = "data" }),
                resolve: context =>
                {
                    var table = context.GetArgument<Table>("data");

                    dbAdapter.Update(
                        new Query("Tables", (QField)"Id" == new QConst(table.Id)),
                        table
                        );
                    return table;
                }
            );
            Field<TableType>(
                "addTable",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<TableInputType>> { Name = "data" }),
                resolve: context =>
                {
                    var table = context.GetArgument<Table>("data");

                    dbAdapter.Insert(
                        "Tables", table
                        );
                    return table;
                }
            );
            Field<TableType>(
                "deleteTable",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<TableInputType>> { Name = "data" }),
                resolve: context =>
                {
                    var table = context.GetArgument<Table>("data");

                    dbAdapter.Delete(
                        new Query("Tables", (QField)"Id" == new QConst(table.Id))
                        );
                    return table;
                }
            );
            Field<TaskType>(
                "updateTask",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<TaskInputType>> { Name = "data" }),
                resolve: context =>
                {
                    var task = context.GetArgument<Task>("data");

                    dbAdapter.Update(
                        new Query("Tasks", (QField)"Id" == new QConst(task.Id)),
                        task
                        );
                    return task;
                }
            );
            Field<TaskType>(
                "addTask",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<TaskInputType>> { Name = "data" }),
                resolve: context =>
                {
                    var task = context.GetArgument<Task>("data");

                    dbAdapter.Insert(
                        "Tasks", task
                        );
                    return task;
                }
            );
            Field<TaskType>(
                "deleteTask",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<TaskInputType>> { Name = "data" }),
                resolve: context =>
                {
                    var task = context.GetArgument<Task>("data");

                    dbAdapter.Delete(
                        new Query("Tasks", (QField)"Id" == new QConst(task.Id))
                        );
                    return task;
                }
            );
            Field<UserType>(
                "auth",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<UserInputType>> { Name = "data" }),
                resolve: context =>
                {
                    var user = context.GetArgument<User>("data");
                    Console.WriteLine(user.Name);

                    var result = dbAdapter.Select(
                        "SELECT * FROM trello.Users WHERE name = '" + user.Name + "' AND password = '" + user.Password + "'"
                        );

                    if (result == null) 
                        return null;
                    
                    return CreateJWTAsync(user, "dupa", "Ni3-Wi3M_J4K_T3N-Kl00cZ_M4_VVyGl0ND4C-Pr053-MnI3-Z05T4VVIC", 7);
                }
            );
            
        }
        public static async Task<string> CreateJWTAsync(
            User user,
            string issuer,
            string symSec,
            int daysValid)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var claims = await CreateClaimsIdentities(user);

            JwtSecurityToken token = null;
            try {
            // Create JWToken
            token = tokenHandler.CreateJwtSecurityToken(issuer: issuer,
                audience: issuer,
                subject: claims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddDays(daysValid),
                signingCredentials:
                new SigningCredentials(
                    new SymmetricSecurityKey(
                        Encoding.Default.GetBytes(symSec)),
                        Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256Signature));
            }catch(Exception e){
                Console.Write(e.Message);
            }

            return tokenHandler.WriteToken(token);
        }

        public static Task<ClaimsIdentity> CreateClaimsIdentities(User user)
        {
            ClaimsIdentity claimsIdentity = new ClaimsIdentity();
            claimsIdentity.AddClaim(new Claim(ClaimTypes.Name, user.Name));
            claimsIdentity.AddClaim(new Claim(ClaimTypes.Role, "User"));

            return System.Threading.Tasks.Task.FromResult(claimsIdentity);
        }
    }
}
