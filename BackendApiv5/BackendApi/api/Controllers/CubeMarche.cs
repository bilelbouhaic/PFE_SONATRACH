using Microsoft.AnalysisServices.AdomdClient;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace VotreProjet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CubeMarche : ControllerBase
    {
        // Chaîne de connexion à votre serveur Analysis Services
        string connectionString = "Data Source=DESKTOP-5C3N6FQ\\SQLDEVANALYSIS;Catalog=ProjetMultidimensionnel2;Integrated Security=SSPI;";

        // GET: api/resultat
        [HttpGet()]
        public IActionResult GetResultat()
        {
            // Requête MDX
            string mdxQuery = @"
                 SELECT NON EMPTY { [Measures].[Nb Vehicule Vendu] } ON COLUMNS,
                  NON EMPTY { ([D Temps 1].[Id Mois].[Id Mois].ALLMEMBERS ) } 
                  DIMENSION PROPERTIES MEMBER_CAPTION, MEMBER_UNIQUE_NAME ON ROWS 
                  FROM [Electric Vehicule] CELL PROPERTIES VALUE, BACK_COLOR, FORE_COLOR, 
                  FORMATTED_VALUE, FORMAT_STRING, FONT_NAME, FONT_SIZE, FONT_FLAGS
            ";

            // Liste pour stocker les résultats
            List<object> results = new List<object>();

            // Connexion au serveur Analysis Services et exécution de la requête MDX
            using (AdomdConnection conn = new AdomdConnection(connectionString))
            {
                conn.Open();
                using (AdomdCommand cmd = new AdomdCommand(mdxQuery, conn))
                {
                    using (AdomdDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            // Ajout de la valeur de la mesure à la liste des résultats
                            if (reader.FieldCount > 0)
                            {
                                object value = reader.GetValue(2);
                                results.Add(value);
                            }
                        }
                    }
                }
            }

            // Retourne les résultats au format JSON
            return Ok(results);
        }
    }
}
