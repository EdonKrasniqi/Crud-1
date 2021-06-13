using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Presistence;

namespace Application.Households
{
    public class HouseholdsList
    {
        public class Query : IRequest<List<Household>> { }

        public class Handler : IRequestHandler<Query, List<Household>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Household>> Handle(Query request,
            CancellationToken cancellationToken)
            {
                var households = await _context.Households.ToListAsync();

                return households;
            }
        }
    }
}