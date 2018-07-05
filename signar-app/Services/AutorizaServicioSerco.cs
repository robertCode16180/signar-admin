using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using signar_app.Helpers;

namespace signar_app.Services
{
    public class AutorizaServicioSerco
    {
        private readonly string SercoServerHost;
        private readonly string NumeroEmpresa;
        private readonly string NumeroServicio;

        public AutorizaServicioSerco()
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.Development.json", optional: true)
                .Build();

            this.SercoServerHost = configuration["ServeHost:SercoServerHost"];
            this.NumeroServicio = configuration["NumeroServicio"];
            this.NumeroEmpresa = configuration["NumeroEmpresa"];

        }

        protected async Task<string> GetIdSercoAsync()
        {
            // Para pasar el error: El certificado remoto no es válido según el procedimiento de validación.
            ServicePointManager.ServerCertificateValidationCallback = new System.Net.Security.RemoteCertificateValidationCallback(AcceptAllCertifications);

            Uri address = new Uri(SercoServerHost + "/AutorizaServicio").AddQuery("empresa", NumeroEmpresa).AddQuery("servicio", NumeroServicio);
            // Create the web request  
            HttpWebRequest request = WebRequest.CreateHttp(address);

            // Set type to POST  
            request.Method = "POST";
            request.ContentType = "application/json";
            request.ContentLength = 0;

            return await HttpHelper.HttpGetResponseAsync(request);
        }

        private static bool AcceptAllCertifications(object sender,
                                                   System.Security.Cryptography.X509Certificates.X509Certificate certification,
                                                   System.Security.Cryptography.X509Certificates.X509Chain chain,
                                                   System.Net.Security.SslPolicyErrors sslPolicyErrors)
        {
            return true;
        }

    }
}
