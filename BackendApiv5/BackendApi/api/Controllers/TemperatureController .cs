using Microsoft.AnalysisServices.AdomdClient;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace VotreProjet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultatController : ControllerBase
    {
        // Chaîne de connexion à votre serveur Analysis Services
        string connectionString = "Data Source=DESKTOP-5C3N6FQ\\SQLDEVANALYSIS;Catalog=ProjetMultidimensionnel2;Integrated Security=SSPI;";

        // GET: api/resultat
        [HttpGet("{wilaya}")]
        public IActionResult GetResultat(int wilaya)
        {
            // Requête MDX
            string mdxQuery = @"
                SELECT
                  NON EMPTY { ([D Wilaya].[Wilaya ID].[Wilaya ID].["+wilaya+@"] * ORDER([D Temps].[Mois].[Mois].ALLMEMBERS, [D Temps].[Mois].CURRENTMEMBER.MEMBER_VALUE, BASC)) } ON COLUMNS,
                  NON EMPTY { [Measures].[Maximum Temperature] } DIMENSION PROPERTIES MEMBER_CAPTION, MEMBER_UNIQUE_NAME ON ROWS
                FROM [Entrepot Meteo]";

            // Liste pour stocker les résultats
            List<List<object>> results = new List<List<object>>();

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
                            // Création d'une liste pour stocker les valeurs de chaque ligne de résultat
                            List<object> rowValues = new List<object>();
                            for (int i = 2; i < reader.FieldCount; i++)
                            {
                                // Ajouter la valeur de la mesure à la liste
                                object value = reader.GetValue(i);
                                rowValues.Add(value);
                            }
                            // Ajout de la liste à la liste de résultats
                            results.Add(rowValues);
                        }
                    }
                }
            }

            // Retourne les résultats au format JSON
            return Ok(results);
        }
    }
}
