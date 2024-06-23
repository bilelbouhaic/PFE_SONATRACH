using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.PrixBase
{
    public class PrixBaseDto
{
    public decimal PrixBase { get; set; }
    public DateTime DateModificationPb { get; set; }
    public int ProduitId { get; set; }
}

}