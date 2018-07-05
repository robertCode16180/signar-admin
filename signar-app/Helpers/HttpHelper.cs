using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace signar_app.Helpers
{
    public static class HttpHelper
    {
        public static Uri AddQuery(this Uri uri, string name, string value)
        {
            var httpValueCollection = HttpUtility.ParseQueryString(uri.Query);

            httpValueCollection.Remove(name);
            httpValueCollection.Add(name, value);

            return new UriBuilder(uri)
            {
                Query = httpValueCollection.ToString()
            }.Uri;
        }

        public static async Task<string> HttpGetResponseAsync(HttpWebRequest request)
        {
            try
            {
                using (var response = request.GetResponse())
                {
                    using (var stream = response.GetResponseStream())
                    using (var Reader = new StreamReader(stream))
                    {
                        string stringJsonData = await Reader.ReadToEndAsync();

                        dynamic Respuesta = JsonConvert.DeserializeObject(stringJsonData);

                        return Respuesta.Message ?? "";

                        //do some deserializing http://www.newtonsoft.com/json/help/html/Performance.htm
                    }
                }
            }
            catch (Exception ex)
            {
                var result = ex;
                throw;
            }   
        }

    }

}