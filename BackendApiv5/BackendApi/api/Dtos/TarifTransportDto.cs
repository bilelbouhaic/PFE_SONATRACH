using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.TarifTransport
{
    public class TarifTransportDto
    {
 public decimal tarifTransport { get; set; }
        public DateOnly dateModificationTt { get; set; }
         public int ProduitId { get; set; }  
    }
}