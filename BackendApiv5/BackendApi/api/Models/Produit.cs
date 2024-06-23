using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Produit
    {
        [Key]
        public int idProduit { get; set; }
        public string nomProduit { get; set; } =string.Empty;


        public ICollection<TarifTransport> tarifTransports { get; set; }
        public ICollection<PrixBase> prixBases { get; set; }
        public ICollection<PrixMn> PrixMns { get; set; }
//many to many
                                                                                           
    }
}