using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore;


namespace api.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions)
        {
        }
        public DbSet<Trp> trps { get; set; }
        public DbSet<Production> productions { get; set; }

         public DbSet<DeclarationRedevance> declarationRedevances { get; set; }
        public DbSet<Investissement> investissements { get; set; }
        public DbSet<Monnaie> monnaies { get; set; }
        public DbSet<Perimetre> perimetres { get; set; }
        public DbSet<PrixBase> prixBases { get; set; }
        public DbSet<PrixMn> prixMns { get; set; }
 
        public DbSet<Produit> produits { get; set; }
        public DbSet<TarifTransport> tarifTransports { get; set; }
        public DbSet<Zone> zones { get; set; }





    }
}