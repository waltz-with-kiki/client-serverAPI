using Microsoft.EntityFrameworkCore;
using test.Server.Models;

namespace test.Server.Data
{
    public class CompanyDbContext :DbContext
    {

        public DbSet<Employee> Employees { get; set; }

        public DbSet<Project> Projects { get; set; }

        public DbSet<Objective> Objectives { get; set; }

        public CompanyDbContext()
        {

        }

        public CompanyDbContext(DbContextOptions<CompanyDbContext> options) :base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Objective>()
                .HasOne(o => o.Author)
                .WithMany()
                .HasForeignKey(o => o.AuthorId)
                .IsRequired(false);

            modelBuilder.Entity<Objective>()
                .HasOne(o => o.Executor)
                .WithMany(e => e.WorkObjectives) 
                .HasForeignKey(o => o.ExecutorId);


            modelBuilder.Entity<Project>()
                .HasOne(e => e.Supervisor)
                .WithMany()
                .HasForeignKey(o => o.SupervisorId)
                .IsRequired(false);


            modelBuilder.Entity<Employee>()
                .HasMany(e => e.EmployeeProjects)
                .WithMany(o => o.Employees);

            base.OnModelCreating(modelBuilder);
        }
    }
}
