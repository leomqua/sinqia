using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Prova.Models;

namespace Prova.Context
{
    public class OrganizadorContext : DbContext
    {
         public OrganizadorContext(DbContextOptions<OrganizadorContext> options) : base(options)
        {
            
        }

        public DbSet<PontosTuristicos> PontosTuristicos { get; set; } 
    
    }
}