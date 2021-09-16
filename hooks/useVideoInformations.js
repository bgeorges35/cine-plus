import { useQuery, gql } from "@apollo/client";

const VIDEO_INFORMATIONS = gql`
  query Query(
    $nodeId: ID!
    $profilePictureSize: ProfileSize!
    $backdropSize: BackdropSize!
  ) {
    node(id: $nodeId) {
      ... on Movie {
        title
        rating
        overview
        videos {
          links {
            web
          }
          key
          type
          site
        }
        credits {
          cast {
            character
            value {
              profilePicture(size: $profilePictureSize)
              name
            }
          }
        }
        genres {
          name
        }
        numberOfRatings
        backdrop(size: $backdropSize)
      }

      ... on TVShow {
        name
        rating
        overview
        videos {
          key
          site
          type
          links {
            web
          }
        }
        credits {
          cast {
            character
            value {
              profilePicture(size: $profilePictureSize)
              name
            }
          }
        }
        genres {
          name
        }
        numberOfRatings
        backdrop(size: $backdropSize)
      }
    }
  }
`;

export default function useVideoInformation(options) {
  return useQuery(VIDEO_INFORMATIONS, options);
}
