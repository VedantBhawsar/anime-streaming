import { animePaheClient } from "@/lib/animeClient";

export async function GET(request: Request, { params }: any) {
  try {
    const genre = params?.genre;
    const response = await animePaheClient.genreSearch(genre);
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
