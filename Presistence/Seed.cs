using System.Linq;
using System.Collections.Generic;
using Domain;
using System;

namespace Presistence.Migrations

{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
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
    }
}