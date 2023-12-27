export interface AlbumResponse {
    data: {
        albumUnion: AlbumData;
    };
    extensions: any;
}

interface AlbumData {
    __typename: string;
    uri: string;
    name: string;
    artists: {
        totalCount: number;
        items: ArtistProfile[];
    };
    coverArt: {
        extractedColors: {
            colorRaw: {
                hex: string;
            };
            colorLight: {
                hex: string;
            };
            colorDark: {
                hex: string;
            };
        };
        sources: ImageSource[];
    };
    discs: {
        totalCount: number;
        items: {
            number: number;
            tracks: {
                totalCount: number;
            };
        }[];
    };
    releases: {
        totalCount: number;
        items: any[]; // Adjust the type according to the actual structure
    };
    type: string;
    date: {
        isoString: string;
        precision: string;
    };
    playability: Playability;
    label: string;
    copyright: {
        totalCount: number;
        items: {
            type: string;
            text: string;
        }[];
    };
    courtesyLine: string;
    saved: boolean;
    sharingInfo: SharingInfo;
    tracks: {
        totalCount: number;
        items: {
            uid: string;
            track: Track;
        }[];
    };
    moreAlbumsByArtist: {
        items: {
            discography: {
                popularReleasesAlbums: {
                    items: {
                        id: string;
                        uri: string;
                        name: string;
                        date: {
                            year: number;
                        };
                        coverArt: {
                            sources: ImageSource[];
                        };
                        playability: Playability;
                        sharingInfo: SharingInfo;
                        type: string;
                    }[];
                };
            };
        }[];
    };
}

interface Playability {
    playable: boolean;
    reason: string;
}
interface ArtistProfile {
    uri: string;
    profile: {
        name: string;
    };
    id?: string;
    visuals?: {
        avatarImage: ImageSource[]
    }
    sharingInfo?: SharingInfo
}
  
interface ImageSource {
    url: string;
    width: number;
    height: number;
}
  
interface SharingInfo {
    shareUrl: string;
    shareId?: string;
}

interface TrackContentRating {
    label: string;
}

interface LinkedTrack {
    __typename: string;
    uri: string;
}

interface Track {
    saved: boolean;
    uri: string;
    name: string;
    playcount: string;
    discNumber: number;
    trackNumber: number;
    contentRating: TrackContentRating;
    relinkingInformation: {
        linkedTrack: LinkedTrack;
    };
    duration: {
        totalMilliseconds: number;
    };
    playability: {
        playable: boolean;
    };
    artists: {
        items: ArtistProfile[];
    };
}



  