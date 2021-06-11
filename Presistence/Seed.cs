using System.Linq;
using System.Collections.Generic;
using Domain;
using System;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace Presistence.Migrations

{
    public class Seed
    {
        public static async Task SeedDataAsync(DataContext context, UserManager<AppUser> userManager )
        {
            if(!userManager.Users.Any()){
                var users = new List<AppUser>{
                    new AppUser{DisplayName= "Bob", UserName= "bob", Email= "bob@test.com"},
                    new AppUser{DisplayName= "Tom", UserName= "tom", Email= "tom@test.com"},
                    new AppUser{DisplayName= "Don", UserName= "don", Email= "don@test.com"},
                };
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if(!context.Contacts.Any()){
                var contacts = new List<Contact>{
                    new Contact 
                    {
                        Name ="Edon Krasniqi2",
                        Email = "edon@test.com",
                        Message = "Hi"
                    }
                };
                context.Contacts.AddRange(contacts);
                context.SaveChanges();
            }
            
            if(!context.Products.Any())
            {
                var products = new List<Product>
                {
                    new Product
                    {
                        Title = "Past Products 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 1 months ago",
                        Category = "mouses",
                        Price = 132 ,
                    },
                    new Product
                    {
                        Title = "Past Products 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 1 months ago",
                        Category = "mouses",
                        Price = 132 ,
                    },
                    new Product
                    {
                        Title = "Past Products 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 1 months ago",
                        Category = "mouses",
                        Price = 132 ,
                    },
                    new Product
                    {
                        Title = "Past Products 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 1 months ago",
                        Category = "mouses",
                        Price = 132 ,
                    },
                    new Product
                    {
                        Title = "Past Products 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 1 months ago",
                        Category = "mouses",
                        Price = 132 ,
                    },
                    new Product
                    {
                        Title = "Past Products 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 1 months ago",
                        Category = "mouses",
                        Price = 132 ,
                    },
                    new Product
                    {
                        Title = "Past Products 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 1 months ago",
                        Category = "mouses",
                        Price = 132 ,
                    },
                    new Product
                    {
                        Title = "Past Products 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 1 months ago",
                        Category = "mouses",
                        Price = 132 ,
                    },
                    new Product
                    {
                        Title = "Past Products 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 1 months ago",
                        Category = "mouses",
                        Price = 132 ,
                    },
                    new Product
                    {
                        Title = "Past Products 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 1 months ago",
                        Category = "mouses",
                        Price = 132 ,
                    },
                    new Product
                    {
                        Title = "Past Products 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 1 months ago",
                        Category = "mouses",
                        Price = 132 ,
                    }
                };
                
                context.Products.AddRange(products);
                context.SaveChanges();
            }
            
        }

        public static Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            throw new NotImplementedException();
        }
    }
}