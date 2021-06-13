using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Presistence;

namespace Application.Clothings
{
    public class ClothingsList
    {
        public class Query : IRequest<List<Clothing>> { }

        public class Handler : IRequestHandler<Query, List<Clothing>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Clothing>> Handle(Query request,
            CancellationToken cancellationToken)
            {
                var clothings = await _context.Clothings.ToListAsync();

                return clothings;
            }
        }
    }
}