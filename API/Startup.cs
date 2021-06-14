using API.Extensions;
using Application.Products;
using Application.Contacts;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Presistence;
using Application.Clothings;
using Application.Healths;
using Application.Households;
using Application.Sports;
using Application.Libraries;

namespace API
{
    public class Startup
    {
        private IConfiguration _config;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
                });
            });
            
            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddMediatR(typeof(ClothingsList.Handler).Assembly);
            services.AddMediatR(typeof(HealthsList.Handler).Assembly);
            services.AddMediatR(typeof(HouseholdsList.Handler).Assembly);
            services.AddMediatR(typeof(SportsList.Handler).Assembly);
            services.AddMediatR(typeof(CList.Handler).Assembly);
            services.AddMediatR(typeof(LibrariesList).Assembly);
            services.AddControllers();
            
            
            // error ka qitu spo muj me i ra nfije, qe munesh me ndreq qit error e vazhdoj, dikun te min 7:30 e videos jom met
            // services.AddRoles<IdentityRole>();
            services.AddControllers(opt =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            }).AddFluentValidation(config =>{
                config.RegisterValidatorsFromAssemblyContaining<Create>();
                config.RegisterValidatorsFromAssemblyContaining<CCreate>();
                config.RegisterValidatorsFromAssemblyContaining<ClothingCreate>();
                config.RegisterValidatorsFromAssemblyContaining<HealthCreate>();
                config.RegisterValidatorsFromAssemblyContaining<HouseholdsCreate>();
                config.RegisterValidatorsFromAssemblyContaining<SportsCreate>();
                config.RegisterValidatorsFromAssemblyContaining<LibraryCreate>();
            });
            services.AddIdentityServices(_config);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                
            }

            // app.UseHttpsRedirection();
            app.UseCors("CorsPolicy");

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
