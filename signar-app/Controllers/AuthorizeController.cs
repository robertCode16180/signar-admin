using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using signar_app.Models;

namespace signar_app.Services
{
    public class UserLogin
    {
        public string UserAD { get; set; }
        public string Password { get; set; }
        public string IdAutorize { get; }
    }

    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizeController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public AuthorizeController(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] UserLogin userLogin)
        {
            if (ModelState.IsValid)
            {
                var UserAD = new ValidaUsuario(userLogin);

                bool CheckUser = await UserAD.CheckUserAsync();

                //Thread.Sleep(10000);

                if (CheckUser)
                {
                    return BuildToken(userLogin);
                }
                else
                {
                    ModelState.AddModelError("Message", "Usuario o contraseña incorrectos.");
                    return BadRequest(ModelState);
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        private IActionResult BuildToken(UserLogin userLogin)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.NameId, userLogin.UserAD),
                new Claim(JwtRegisteredClaimNames.Sub, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Llave_super_secreta"]));
            
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
 
            var expiration = DateTime.UtcNow.AddMinutes(15);

            JwtSecurityToken token = new JwtSecurityToken(
               issuer: "https://localhost:44307/",
               audience: "https://localhost:44307/",
               claims: claims,
               notBefore: DateTime.Now,//Add
               expires: expiration,
               signingCredentials: creds);

            return Ok(new
            {
                access_token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = expiration
            });

        }

        [HttpGet]
        public string Get()
        {
            return "Verbo no contemplado";
        }

        // PUT api/values/
        [HttpPut]
        public string Put()
        {
            return "Verbo no contemplado";
        }

        // DELETE api/values/
        [HttpDelete]
        public string Delete()
        {
            return "Verbo no contemplado";
        }
    }
}