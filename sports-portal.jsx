import React, { useState, useEffect } from 'react';
import { Search, Trophy, Users, Calendar, ChevronDown, Image as ImageIcon } from 'lucide-react';

const SportsPortal = () => {
  const [events, setEvents] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('events');
  const [selectedSport, setSelectedSport] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [sports, setSports] = useState([]);

  // Google Sheets configuration
  // Replace these with your actual sheet IDs
  const SHEETS_API_KEY = 'YOUR_GOOGLE_SHEETS_API_KEY'; // Get from Google Cloud Console
  const EVENTS_SHEET_ID = 'YOUR_EVENTS_SHEET_ID'; // Share sheet, get ID from URL
  const PLAYERS_SHEET_ID = 'YOUR_PLAYERS_SHEET_ID';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch events
        const eventsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${EVENTS_SHEET_ID}/values/Sheet1?key=${SHEETS_API_KEY}`;
        const eventsRes = await fetch(eventsUrl);
        const eventsData = await eventsRes.json();
        
        if (eventsData.values) {
          const headers = eventsData.values[0];
          const parsedEvents = eventsData.values.slice(1).map(row => ({
            id: row[0],
            sport: row[1],
            year: row[2],
            event: row[3],
            description: row[4],
            imageUrls: row[5] ? row[5].split(',').map(url => url.trim()) : [],
          }));
          setEvents(parsedEvents);
          
          // Extract unique sports
          const uniqueSports = [...new Set(parsedEvents.map(e => e.sport))];
          setSports(uniqueSports);
        }

        // Fetch players
        const playersUrl = `https://sheets.googleapis.com/v4/spreadsheets/${PLAYERS_SHEET_ID}/values/Sheet1?key=${SHEETS_API_KEY}`;
        const playersRes = await fetch(playersUrl);
        const playersData = await playersRes.json();
        
        if (playersData.values) {
          const parsedPlayers = playersData.values.slice(1).map(row => ({
            id: row[0],
            name: row[1],
            sport: row[2],
            year: row[3],
            position: row[4],
            achievements: row[5],
            photoUrl: row[6],
          }));
          setPlayers(parsedPlayers);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and search logic
  const filteredEvents = events.filter(event => {
    const matchesSport = selectedSport === 'all' || event.sport === selectedSport;
    const matchesSearch = event.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.sport.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSport && matchesSearch;
  });

  const filteredPlayers = players.filter(player => {
    const matchesSport = selectedSport === 'all' || player.sport === selectedSport;
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         player.sport.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSport && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300 text-lg font-medium">Loading sports legacy...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-700 backdrop-blur-sm sticky top-0 z-50 bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
                LINDA SECONDARY
              </h1>
              <p className="text-slate-400 text-sm tracking-widest uppercase mt-1">Sports Legacy & Excellence</p>
            </div>
            <Trophy className="w-12 h-12 text-emerald-400 opacity-70" />
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search events, players, sports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-slate-700 pb-4">
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-3 font-semibold text-sm uppercase tracking-wide transition-all flex items-center gap-2 border-b-2 -mb-4 ${
              activeTab === 'events'
                ? 'text-emerald-400 border-emerald-400'
                : 'text-slate-400 border-transparent hover:text-slate-300'
            }`}
          >
            <Calendar className="w-5 h-5" />
            Events & Competitions
          </button>
          <button
            onClick={() => setActiveTab('players')}
            className={`px-6 py-3 font-semibold text-sm uppercase tracking-wide transition-all flex items-center gap-2 border-b-2 -mb-4 ${
              activeTab === 'players'
                ? 'text-cyan-400 border-cyan-400'
                : 'text-slate-400 border-transparent hover:text-slate-300'
            }`}
          >
            <Users className="w-5 h-5" />
            Players & Athletes
          </button>
        </div>

        {/* Sport Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSport('all')}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                selectedSport === 'all'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All Sports
            </button>
            {sports.map(sport => (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                  selectedSport === sport
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div>
            {filteredEvents.length === 0 ? (
              <div className="text-center py-16">
                <Trophy className="w-16 h-16 text-slate-600 mx-auto mb-4 opacity-50" />
                <p className="text-slate-400 text-lg">No events found matching your search.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents.map(event => (
                  <div
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className="group cursor-pointer bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-emerald-400 transition-all hover:shadow-2xl hover:shadow-emerald-400/20 hover:-translate-y-1"
                  >
                    {/* Event Image */}
                    <div className="aspect-video bg-slate-700 relative overflow-hidden">
                      {event.imageUrls[0] ? (
                        <img
                          src={event.imageUrls[0]}
                          alt={event.event}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-600 to-slate-700">
                          <ImageIcon className="w-8 h-8 text-slate-500" />
                        </div>
                      )}
                    </div>

                    {/* Event Info */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider">
                          {event.sport}
                        </span>
                        <span className="text-slate-500 text-sm font-medium">{event.year}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-100 mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                        {event.event}
                      </h3>
                      <p className="text-slate-400 text-sm line-clamp-2">{event.description}</p>
                      {event.imageUrls.length > 1 && (
                        <div className="mt-3 text-xs text-slate-500">
                          +{event.imageUrls.length - 1} more image{event.imageUrls.length > 2 ? 's' : ''}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Players Tab */}
        {activeTab === 'players' && (
          <div>
            {filteredPlayers.length === 0 ? (
              <div className="text-center py-16">
                <Users className="w-16 h-16 text-slate-600 mx-auto mb-4 opacity-50" />
                <p className="text-slate-400 text-lg">No players found matching your search.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {filteredPlayers.map(player => (
                  <div
                    key={player.id}
                    className="group bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-cyan-400 transition-all hover:shadow-2xl hover:shadow-cyan-400/20"
                  >
                    {/* Player Photo */}
                    <div className="aspect-square bg-slate-700 relative overflow-hidden">
                      {player.photoUrl ? (
                        <img
                          src={player.photoUrl}
                          alt={player.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-600 to-slate-700">
                          <Users className="w-8 h-8 text-slate-500" />
                        </div>
                      )}
                    </div>

                    {/* Player Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-slate-100 mb-1 group-hover:text-cyan-400 transition-colors">
                        {player.name}
                      </h3>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="inline-block px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded text-xs font-bold">
                            {player.sport}
                          </span>
                          <span className="text-slate-500">{player.year}</span>
                        </div>
                        {player.position && (
                          <p className="text-slate-400">{player.position}</p>
                        )}
                        {player.achievements && (
                          <p className="text-emerald-400/80 italic line-clamp-2">{player.achievements}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gallery */}
            <div className="relative bg-slate-900 aspect-video overflow-hidden">
              {selectedEvent.imageUrls[0] ? (
                <img
                  src={selectedEvent.imageUrls[0]}
                  alt={selectedEvent.event}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800">
                  <ImageIcon className="w-12 h-12 text-slate-600" />
                </div>
              )}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-all"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                    {selectedEvent.sport}
                  </span>
                  <h2 className="text-3xl font-black text-slate-100 mb-2">
                    {selectedEvent.event}
                  </h2>
                  <p className="text-slate-400">{selectedEvent.year}</p>
                </div>
              </div>

              <p className="text-slate-300 mb-6 leading-relaxed">
                {selectedEvent.description}
              </p>

              {/* Image Gallery */}
              {selectedEvent.imageUrls.length > 1 && (
                <div className="mt-8 pt-8 border-t border-slate-700">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                    Gallery ({selectedEvent.imageUrls.length} images)
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {selectedEvent.imageUrls.map((url, idx) => (
                      <div
                        key={idx}
                        className="aspect-square bg-slate-700 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
                      >
                        <img
                          src={url}
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SportsPortal;