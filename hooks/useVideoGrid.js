import { gql, useQuery } from "@apollo/client";

export default function useVideoGrid(type, options) {
  const TRENDING_TYPE = type.map(
    (t, i) => `
          ${t} {
            popular(first: $popularFirst) {
              edges {
                node {
                  backdrop(size: $backdropSize)
                  ${t === "movies" ? "title" : "name"}
                  id
                }
                cursor
              }
            }
          }`
  );

  const GET_TRENDINGS = gql`
    query Query($genreId: ID!, $backdropSize: BackdropSize!, $popularFirst: Int) {
      genres {
        genre(id: $genreId) {
          ${TRENDING_TYPE}
          name
        }
      }
    }
  `;
  return useQuery(GET_TRENDINGS, options);
}
