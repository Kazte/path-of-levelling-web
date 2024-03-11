export async function GET({ params, request }) {
  return new Response(
    JSON.stringify({
      name: 'John Doe',
      path: new URL(request.url).pathname
    })
  );
}
