export async function GET({ request }: { request: Request }) {
  return new Response(
    JSON.stringify({
      name: 'John Doe',
      path: new URL(request.url).pathname
    })
  );
}
