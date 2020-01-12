using GraphQL.Authorization;
using System.Security.Claims;

public class GraphQLUserContext : IProvideClaimsPrincipal
{
    public ClaimsPrincipal User { get; set; }
}