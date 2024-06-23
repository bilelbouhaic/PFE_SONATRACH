using Microsoft.AspNetCore.Mvc;
using Microsoft.AnalysisServices.AdomdClient;
using System.Collections.Generic;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QantiteProduite : ControllerBase
    {
        // Define a class to represent the data structure
        public class CubeDataRow
        {
            
            public double Petrole { get; set; }
            public double gaz { get; set; }
            public double Condensat { get; set; }
            public double Gpl { get; set; }
        }

        // Endpoint GET pour récupérer des données à partir d'une requête MDX sans mesures
       // Endpoint GET pour récupérer des données à partir d'une requête MDX sans mesures
// Endpoint GET pour récupérer des données à partir d'une requête MDX sans mesures
[HttpGet("{date}")]
public IActionResult GetCubeData(string date)
{
    // Chaîne de connexion au cube SSAS
    string connectionString = "Data Source=DESKTOP-5C3N6FQ\\SQLDEVANALYSIS;Catalog=ProjetMultidimensionnel2;Integrated Security=SSPI;";

    // Requête MDX pour récupérer les membres des dimensions sans inclure de mesures
    string mdxQuery = @"
      WITH 
  MEMBER [Measures].[AverageQuantiteProduiteMois] AS 
    AVG([D Perimetre].[Id Perimetre].Members, [Measures].[Quantite Produite Mois])

SELECT 
  {
  EXCEPT([D Produit].[Produit].Members, {[D Produit].[Produit].[All]})
 
  } ON COLUMNS,
  {
       [Measures].[AverageQuantiteProduiteMois]
  } ON ROWS
FROM 
  [ED1]
WHERE 
  (
    [D Date].[Id Date].["+date+@"]
  )


    ";

    CubeDataRow cubeData = null;

    using (AdomdConnection conn = new AdomdConnection(connectionString))
    {
        conn.Open();
        using (AdomdCommand cmd = new AdomdCommand(mdxQuery, conn))
        {
            using (AdomdDataReader reader = cmd.ExecuteReader())
            {
                if (reader.Read())
                {
                    // Création d'un nouvel objet CubeDataRow
                    cubeData = new CubeDataRow
                    {
                            
                                    Petrole = reader.GetDouble(1),
                                     gaz = reader.GetDouble(2),
                                      Condensat = reader.GetDouble(3),
                                       Gpl = reader.GetDouble(4), // Le deuxième champ est la moyenne de Quantite Produite Mois
                               
                    };
                }
            }
        }
        conn.Close();
    }

    // Si aucune donnée n'a été trouvée pour la date donnée, retourner NotFound
    if (cubeData == null)
    {
        return NotFound();
    }

    // Retourne les données sous forme de réponse HTTP OK avec les résultats pour la date spécifiée
    return Ok(cubeData);
}

    }
}
