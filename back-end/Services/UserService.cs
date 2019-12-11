using back_end.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Mutations.Tables;
using NReco.Data;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace back_end.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
    }

    public class UserService : IUserService
    {

        private readonly AppSettings _appSettings;
        private readonly DbDataAdapter _dbDataAdapter;

        public UserService(IOptions<AppSettings> appSettings, DbDataAdapter dbDataAdapter)
        {
            _appSettings = appSettings.Value;
            _dbDataAdapter = dbDataAdapter;
        }

        public User Authenticate(string username, string password)
        {

            var result = _dbDataAdapter.Select(
                        "SELECT * FROM trello.Users WHERE name = '" + username + "' AND password = '" + password + "'"
                        )
                        .ToDictionary();

            if (result == null)
                return null;
            // uwierzytelnication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("Ni3-Wi3M_J4K_T3N-Kl00cZ_M4_VVyGl0ND4C-Pr053-MnI3-Z05T4VVIC");//_appSettings.Secret);
            User user = new User();
            user.Id = result["id"].ToString();
            user.Name = result["name"].ToString();
            user.Password = result["password"].ToString();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            return user.WithoutPassword();
        }

        public IEnumerable<User> GetAll()
        {
            return null;
        }
    }
}
