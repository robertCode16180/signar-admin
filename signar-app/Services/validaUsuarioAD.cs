using Microsoft.Extensions.Configuration;
using signar_app.Helpers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace signar_app.Services
{
    public class ValidaUsuario : AutorizaServicioSerco
    {
        private readonly string SercoServerHost;
        private UserLogin _userLogin;
        
        public ValidaUsuario(UserLogin userLogin)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                                .SetBasePath(Directory.GetCurrentDirectory())
                                .AddJsonFile("appsettings.json")
                                .AddJsonFile("appsettings.Development.json", optional: true)
                                .Build();

            this.SercoServerHost = configuration["ServeHost:SercoServerHost"];

            this._userLogin = userLogin;
        }

        public async Task<bool> CheckUserAsync()
        {
            string IdAutorizaSerco = await GetIdSercoAsync();

            Uri address = new Uri(SercoServerHost + "/ValidaUsuario").AddQuery("id", IdAutorizaSerco).AddQuery("usuario", _userLogin.UserAD).AddQuery("clave", _userLogin.Password);

            // Create the web request  
            HttpWebRequest request = WebRequest.CreateHttp(address);

            // Set type to POST  
            request.Method = "POST";
            request.ContentType = "application/json";
            request.ContentLength = 0;

            var respuesta = await HttpHelper.HttpGetResponseAsync(request);

            if (respuesta == "OK")
            {
                return true;
            }
            else
            {
                return false;
            }
        }



    }
}
