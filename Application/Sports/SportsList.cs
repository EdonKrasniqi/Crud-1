using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Presistence;

namespace Application.Sports
{
    public class SportsList
    {
        public class Query : IRequest<List<Sport>> { }

        public class Handler : IRequestHandler<Query, List<Sport>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Sport>> Handle(Query request,
            CancellationToken cancellationToken)
            {
                var sports = await _context.Sports.ToListAsync();

                return sports;
            }
        }
    }
}