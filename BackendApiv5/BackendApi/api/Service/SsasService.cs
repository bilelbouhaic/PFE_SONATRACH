using Microsoft.AnalysisServices.AdomdClient;

public class SsasService
{
    private readonly string _connectionString;

    public SsasService(string connectionString)
    {
        _connectionString = connectionString;
    }

    public List<string> ExecuteMDXQuery(string mdxQuery)
    {
        List<string> results = new List<string>();

        using (var conn = new AdomdConnection(_connectionString))
        {
            conn.Open();
            var cmd = new AdomdCommand(mdxQuery, conn);
            var reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                // Traitement des résultats de la requête
                string result = reader.GetString(0); // Exemple de traitement, à adapter selon vos besoins
                results.Add(result);
            }

            reader.Close();
        }

        return results;
    }
}
