using Microsoft.AspNetCore.Mvc;
using Microsoft.AnalysisServices.AdomdClient;
using System.Collections.Generic;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PerimetreTaxeController : ControllerBase
    {
        // Définir une classe pour représenter la structure des données
        public class CubeDataRow
        {
            public string Nom { get; set; }
            public double Valeur { get; set; }
        }

        // Endpoint GET pour récupérer des données à partir d'une requête MDX sans mesures
        [HttpGet("{date}")]
        public IActionResult GetCubeData(string date)
        {
            // Chaîne de connexion au cube SSAS
            string connectionString = "Data Source=DESKTOP-5C3N6FQ\\SQLDEVANALYSIS;Catalog=ProjetMultidimensionnel2;Integrated Security=SSPI;";

            // Requête MDX pour récupérer les membres des dimensions sans inclure de mesures
            string mdxQuery = @"
                SELECT 
                    NON EMPTY { [Measures].[Somme Taxe Mois]  } ON COLUMNS, 
                    NON EMPTY { 
                        TOPCOUNT(
                            ([D Perimetre 1].[Perimetre].[Perimetre].ALLMEMBERS * 
                             [D Date 2].[Id Date].[Id Date].["+date+@"]), 
                            5, 
                            [Measures].[Somme Taxe Mois] 
                        ) 
                    } 
                ON ROWS 
                FROM [ED1 Fiscalite]
            ";

            // Liste pour stocker toutes les lignes de CubeDataRow
            List<CubeDataRow> cubeDataList = new List<CubeDataRow>();

            using (AdomdConnection conn = new AdomdConnection(connectionString))
            {
                conn.Open();
                using (AdomdCommand cmd = new AdomdCommand(mdxQuery, conn))
                {
                    using (AdomdDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            // Création d'un nouvel objet CubeDataRow pour chaque ligne
                            var cubeData = new CubeDataRow
                            {
                                Nom = reader.GetString(0),
                                Valeur = reader.GetDouble(2)
                            };

                            // Ajouter l'objet à la liste
                            cubeDataList.Add(cubeData);
                        }
                    }
                }
                conn.Close();
            }

            // Si aucune donnée n'a été trouvée, retourner NotFound
            if (cubeDataList.Count == 0)
            {
                return NotFound();
            }

            // Retourne les données sous forme de réponse HTTP OK avec les résultats
            return Ok(cubeDataList);
        }
    }
}
