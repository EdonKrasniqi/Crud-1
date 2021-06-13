using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Presistence;

namespace Application.Healths
{
    public class HealthsDetails
    {
        public class Query : IRequest<Health>
        {
            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Query, Health>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Health> Handle(Query request, CancellationToken cancellationToken)
            {
                var health = await _context.Healths.FindAsync(request.Id);

                return health;
            }
        }
    }
}