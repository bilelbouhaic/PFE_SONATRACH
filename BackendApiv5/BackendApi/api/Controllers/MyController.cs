using Microsoft.AspNetCore.Mvc;
using Microsoft.AnalysisServices.AdomdClient;
using System;
using System.Collections.Generic;

namespace YourApplication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WilayaDataController : ControllerBase
    {
        [HttpGet("{wilayaId}")]
        public IActionResult GetWilayaData(int wilayaId)
{
    // Connexion à la base de données OLAP
    string connectionString = "Data Source=DESKTOP-5C3N6FQ\\SQLDEVANALYSIS;Catalog=ProjetMultidimensionnel2;Integrated Security=SSPI;";
    using (AdomdConnection conn = new AdomdConnection(connectionString))
    {
        conn.Open();

        // Exécution de la requête MDX
           string mdxQuery = $@"
              SELECT NON EMPTY [Measures].[Quantite Produite Mois] ON COLUMNS, 
              NON EMPTY ([D Date].[Mois].[Mois].ALLMEMBERS * [D Perimetre].[Wilaya].[Wilaya].&[{wilayaId}]) 
              ON ROWS FROM [ED1]";

        using (AdomdCommand cmd = new AdomdCommand(mdxQuery, conn))
        {
            using (AdomdDataReader reader = cmd.ExecuteReader())
            {
                // Récupération des résultats et formatage en tableau de double
                var wilayaData = new List<double>();
                while (reader.Read())
                {
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        // Récupération de la valeur numérique de la cellule
                        double cellValue = Convert.ToDouble(reader[i]);
                        wilayaData.Add(cellValue);
                    }
                }

                // Retour des données formatées sous forme de réponse HTTP GET
                return Ok(wilayaData);
            }
        }
    }
}

    }
}
