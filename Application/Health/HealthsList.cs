using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Presistence;

namespace Application.Healths
{
    public class HealthsList
    {
        public class Query : IRequest<List<Health>> { }

        public class Handler : IRequestHandler<Query, List<Health>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Health>> Handle(Query request,
            CancellationToken cancellationToken)
            {
                var healths = await _context.Healths.ToListAsync();

                return healths;
            }
        }
    }
}