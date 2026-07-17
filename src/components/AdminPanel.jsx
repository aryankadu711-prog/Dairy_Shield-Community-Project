import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Settings, BarChart3, Globe, BookOpen, Image as ImageIcon, CheckCircle, ShieldAlert, Plus, Edit, Trash } from 'lucide-react';

const AdminPanel = ({ isOpen, onClose }) => {
  const { 
    isAdmin, setIsAdmin, stats, updateStats, 
    surveyConfig, updateSurveyConfig, gallery, 
    addGalleryImage, articles, updateArticle, deleteArticle 
  } = useContext(AppContext);

  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState('stats');

  // Input states
  const [localStats, setLocalStats] = useState({ ...stats });
  const [localConfig, setLocalConfig] = useState({ ...surveyConfig });
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Gallery upload state
  const [newImage, setNewImage] = useState({ src: '', category: 'Awareness Campaigns', title: '', description: '' });
  const [gallerySuccess, setGallerySuccess] = useState(false);

  // Article creation/editing state
  const [editingArticle, setEditingArticle] = useState(null);
  const [newArticle, setNewArticle] = useState({ title: '', category: 'Milk Safety', summary: '', content: '', author: '' });
  const [articleSuccess, setArticleSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAdmin(true);
      setLoginError(false);
      // Sync local fields
      setLocalStats({ ...stats });
      setLocalConfig({ ...surveyConfig });
    } else {
      setLoginError(true);
    }
  };

  const handleSaveStatsAndConfig = (e) => {
    e.preventDefault();
    updateStats(localStats);
    updateSurveyConfig(localConfig);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(prev => ({ ...prev, src: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGallerySubmit = (e) => {
    e.preventDefault();
    if (!newImage.src) return;
    addGalleryImage(newImage);
    setGallerySuccess(true);
    setNewImage({ src: '', category: 'Awareness Campaigns', title: '', description: '' });
    // Reset file input
    document.getElementById('gallery-file-input').value = '';
    setTimeout(() => setGallerySuccess(false), 2000);
  };

  const handleArticleSubmit = (e) => {
    e.preventDefault();
    if (editingArticle) {
      updateArticle({ ...editingArticle });
      setEditingArticle(null);
    } else {
      updateArticle(newArticle);
      setNewArticle({ title: '', category: 'Milk Safety', summary: '', content: '', author: '' });
    }
    setArticleSuccess(true);
    setTimeout(() => setArticleSuccess(false), 2000);
  };

  const startEditArticle = (art) => {
    setEditingArticle({ ...art });
  };

  const handleDeleteArticle = (id) => {
    if (window.confirm("Are you sure you want to delete this educational article?")) {
      deleteArticle(id);
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setPassword('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white dark:bg-dairy-dark rounded-3xl max-w-4xl w-full h-[85vh] shadow-2xl flex flex-col overflow-hidden border border-slate-100 dark:border-white/5"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-slate-50 dark:bg-slate-900 px-6 py-4 flex justify-between items-center border-b border-slate-200/50 dark:border-white/5">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-dairy-green-700 dark:text-dairy-green-400" />
            <h3 className="font-display font-extrabold text-lg text-slate-800 dark:text-white">
              DairyShield Management Panel
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Auth Gating */}
        {!isAdmin ? (
          <div className="flex-grow flex flex-col justify-center items-center p-8 max-w-md mx-auto text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6">
              <ShieldAlert className="w-8 h-8" />
            </div>
            
            <h4 className="font-display font-extrabold text-xl text-slate-800 dark:text-white mb-2">
              Administrator Login Required
            </h4>
            
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
              Log in to modify the campaign counters, edit resource articles, upload gallery pictures, or configure survey endpoints.
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter Admin Password (admin123)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-900 text-slate-850 dark:text-white text-sm outline-none focus:ring-2 focus:ring-dairy-green-500 text-center font-semibold"
                />
                {loginError && (
                  <span className="text-xs text-rose-500 font-bold block mt-1.5">Incorrect password. Please try again.</span>
                )}
              </div>
              
              <button
                type="submit"
                className="w-full py-3 bg-dairy-green-700 hover:bg-dairy-green-600 text-white font-bold rounded-2xl shadow-lg transition-colors cursor-pointer text-sm"
              >
                Unlock Panel
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-grow flex overflow-hidden">
            
            {/* Sidebar Tabs */}
            <div className="w-48 bg-slate-50 dark:bg-slate-900/50 border-r border-slate-200/50 dark:border-white/5 py-6 px-3 flex flex-col space-y-1 justify-between shrink-0">
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`w-full flex items-center space-x-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'stats'
                      ? 'bg-dairy-green-500/10 text-dairy-green-700 dark:text-dairy-green-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Stats & Links</span>
                </button>

                <button
                  onClick={() => setActiveTab('articles')}
                  className={`w-full flex items-center space-x-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'articles'
                      ? 'bg-dairy-green-500/10 text-dairy-green-700 dark:text-dairy-green-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Articles</span>
                </button>

                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`w-full flex items-center space-x-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'gallery'
                      ? 'bg-dairy-green-500/10 text-dairy-green-700 dark:text-dairy-green-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Gallery</span>
                </button>
              </div>

              <button
                onClick={handleLogout}
                className="w-full text-center py-2 border border-slate-200 dark:border-white/5 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 cursor-pointer"
              >
                Log Out
              </button>
            </div>

            {/* Panel Content Workspace */}
            <div className="flex-grow p-6 overflow-y-auto bg-white dark:bg-dairy-dark">
              
              {/* Tab 1: Stats & Config */}
              {activeTab === 'stats' && (
                <form onSubmit={handleSaveStatsAndConfig} className="space-y-6">
                  <div>
                    <h4 className="font-display font-black text-base text-slate-800 dark:text-white mb-4">Update Impact Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">People Reached</label>
                        <input
                          type="number"
                          value={localStats.reached}
                          onChange={e => setLocalStats(prev => ({ ...prev, reached: parseInt(e.target.value) || 0 }))}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-850 dark:text-white outline-none focus:ring-1 focus:ring-dairy-green-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Survey Responses</label>
                        <input
                          type="number"
                          value={localStats.surveyResponses}
                          onChange={e => setLocalStats(prev => ({ ...prev, surveyResponses: parseInt(e.target.value) || 0 }))}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-850 dark:text-white outline-none focus:ring-1 focus:ring-dairy-green-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Awareness Campaigns</label>
                        <input
                          type="number"
                          value={localStats.awarenessDrives}
                          onChange={e => setLocalStats(prev => ({ ...prev, awarenessDrives: parseInt(e.target.value) || 0 }))}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-850 dark:text-white outline-none focus:ring-1 focus:ring-dairy-green-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Local Communities</label>
                        <input
                          type="number"
                          value={localStats.localCommunities}
                          onChange={e => setLocalStats(prev => ({ ...prev, localCommunities: parseInt(e.target.value) || 0 }))}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-850 dark:text-white outline-none focus:ring-1 focus:ring-dairy-green-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 dark:border-white/5 pt-6">
                    <h4 className="font-display font-black text-base text-slate-800 dark:text-white mb-4">Manage Google Form Links</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Google Form Link (Direct URL)</label>
                        <input
                          type="text"
                          value={localConfig.formLink}
                          onChange={e => setLocalConfig(prev => ({ ...prev, formLink: e.target.value }))}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-850 dark:text-white outline-none focus:ring-1 focus:ring-dairy-green-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Form Embed Link (iframe src)</label>
                        <input
                          type="text"
                          value={localConfig.embedLink}
                          onChange={e => setLocalConfig(prev => ({ ...prev, embedLink: e.target.value }))}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-850 dark:text-white outline-none focus:ring-1 focus:ring-dairy-green-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Google Spreadsheet ID (for Syncing Responses)</label>
                        <input
                          type="text"
                          value={localConfig.spreadsheetId || ''}
                          onChange={e => setLocalConfig(prev => ({ ...prev, spreadsheetId: e.target.value }))}
                          placeholder="e.g. 1aBC-defGHIJkLMnopQRsTUV_wXyZ"
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-850 dark:text-white outline-none focus:ring-1 focus:ring-dairy-green-500"
                        />
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">
                          Input the spreadsheet ID associated with the Google Form (make sure the sheet sharing settings are set to "Anyone with the link can view").
                        </span>
                      </div>
                    </div>
                  </div>

                  {saveSuccess && (
                    <div className="p-3 bg-dairy-green-50 dark:bg-dairy-green-950/20 text-dairy-green-700 dark:text-dairy-green-400 rounded-xl text-xs font-bold flex items-center space-x-1.5">
                      <CheckCircle className="w-4 h-4" />
                      <span>Campaign configurations saved successfully!</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-dairy-green-700 hover:bg-dairy-green-600 text-white font-bold rounded-xl shadow-md text-xs cursor-pointer"
                  >
                    Save Changes
                  </button>
                </form>
              )}

              {/* Tab 2: Articles Management */}
              {activeTab === 'articles' && (
                <div className="space-y-6">
                  {editingArticle || newArticle.title ? (
                    <form onSubmit={handleArticleSubmit} className="space-y-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-display font-black text-base text-slate-800 dark:text-white">
                          {editingArticle ? 'Edit Resource Article' : 'Write New Resource Article'}
                        </h4>
                        <button
                          type="button"
                          onClick={() => { setEditingArticle(null); setNewArticle({ title: '', category: 'Milk Safety', summary: '', content: '', author: '' }); }}
                          className="text-xs text-slate-400 font-bold hover:text-slate-600 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Article Title</label>
                          <input
                            type="text"
                            required
                            value={editingArticle ? editingArticle.title : newArticle.title}
                            onChange={e => {
                              if (editingArticle) setEditingArticle(prev => ({ ...prev, title: e.target.value }));
                              else setNewArticle(prev => ({ ...prev, title: e.target.value }));
                            }}
                            className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-850 dark:text-white outline-none focus:ring-1 focus:ring-dairy-green-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Category</label>
                          <select
                            value={editingArticle ? editingArticle.category : newArticle.category}
                            onChange={e => {
                              if (editingArticle) setEditingArticle(prev => ({ ...prev, category: e.target.value }));
                              else setNewArticle(prev => ({ ...prev, category: e.target.value }));
                            }}
                            className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-850 dark:text-white outline-none focus:ring-1 focus:ring-dairy-green-500"
                          >
                            <option value="Milk Safety">Milk Safety</option>
                            <option value="Animal Welfare">Animal Welfare</option>
                            <option value="Food Quality">Food Quality</option>
                            <option value="Healthy Dairy Practices">Healthy Dairy Practices</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Author Bio</label>
                          <input
                            type="text"
                            placeholder="e.g. Dr. Jane Doe (Micro-biologist)"
                            value={editingArticle ? (editingArticle.author || '') : newArticle.author}
                            onChange={e => {
                              if (editingArticle) setEditingArticle(prev => ({ ...prev, author: e.target.value }));
                              else setNewArticle(prev => ({ ...prev, author: e.target.value }));
                            }}
                            className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-850 dark:text-white outline-none focus:ring-1 focus:ring-dairy-green-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Summary (1-2 sentences)</label>
                          <input
                            type="text"
                            required
                            value={editingArticle ? editingArticle.summary : newArticle.summary}
                            onChange={e => {
                              if (editingArticle) setEditingArticle(prev => ({ ...prev, summary: e.target.value }));
                              else setNewArticle(prev => ({ ...prev, summary: e.target.value }));
                            }}
                            className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-850 dark:text-white outline-none focus:ring-1 focus:ring-dairy-green-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Article Content (use double enter for paragraphs)</label>
                        <textarea
                          rows="6"
                          required
                          value={editingArticle ? editingArticle.content : newArticle.content}
                          onChange={e => {
                            if (editingArticle) setEditingArticle(prev => ({ ...prev, content: e.target.value }));
                            else setNewArticle(prev => ({ ...prev, content: e.target.value }));
                          }}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-850 dark:text-white outline-none focus:ring-1 focus:ring-dairy-green-500 resize-none font-sans"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-dairy-green-700 hover:bg-dairy-green-600 text-white font-bold rounded-xl shadow-md text-xs cursor-pointer"
                      >
                        {editingArticle ? 'Save Changes' : 'Publish Article'}
                      </button>
                    </form>
                  ) : (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="font-display font-black text-base text-slate-800 dark:text-white">Active Resources</h4>
                        <button
                          onClick={() => setNewArticle({ title: 'New Article Spec', category: 'Milk Safety', summary: '', content: '', author: '' })}
                          className="flex items-center space-x-1 px-4 py-2 bg-dairy-green-700 text-white text-xs font-bold rounded-xl shadow hover:bg-dairy-green-600 transition-colors cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Compose Article</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        {articles.map((art) => (
                          <div 
                            key={art.id} 
                            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/35 border border-slate-200/50 dark:border-white/5 flex items-center justify-between"
                          >
                            <div>
                              <span className="text-[10px] font-bold text-dairy-green-700 dark:text-dairy-green-400 uppercase">{art.category}</span>
                              <h5 className="font-display font-bold text-sm text-slate-800 dark:text-white mt-0.5">{art.title}</h5>
                            </div>
                            
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => startEditArticle(art)}
                                className="p-1.5 bg-white dark:bg-slate-800 rounded-xl text-slate-500 hover:text-dairy-green-700 border border-slate-200/40 dark:border-white/5 cursor-pointer"
                                aria-label="Edit Article"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteArticle(art.id)}
                                className="p-1.5 bg-white dark:bg-slate-800 rounded-xl text-slate-500 hover:text-rose-500 border border-slate-200/40 dark:border-white/5 cursor-pointer"
                                aria-label="Delete Article"
                              >
                                <Trash className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {articleSuccess && (
                    <div className="p-3 bg-dairy-green-50 dark:bg-dairy-green-950/20 text-dairy-green-700 dark:text-dairy-green-400 rounded-xl text-xs font-bold flex items-center space-x-1.5">
                      <CheckCircle className="w-4 h-4" />
                      <span>Article index synced successfully!</span>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Gallery Photo Upload */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <h4 className="font-display font-black text-base text-slate-800 dark:text-white">Upload New Photo</h4>
                  
                  <form onSubmit={handleGallerySubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Image Title</label>
                        <input
                          type="text"
                          required
                          value={newImage.title}
                          onChange={e => setNewImage(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g. Village Testing Booth"
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-850 dark:text-white outline-none focus:ring-1 focus:ring-dairy-green-500"
                        />
                      </div>
                      
                      <div>
                        <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Category</label>
                        <select
                          value={newImage.category}
                          onChange={e => setNewImage(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-850 dark:text-white outline-none focus:ring-1 focus:ring-dairy-green-500"
                        >
                          <option value="Awareness Campaigns">Awareness Campaigns</option>
                          <option value="Community Visits">Community Visits</option>
                          <option value="Helping Dairy Farmers">Helping Dairy Farmers</option>
                          <option value="Survey Collection">Survey Collection</option>
                          <option value="Animal Care">Animal Care</option>
                          <option value="Education Sessions">Education Sessions</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Short Description</label>
                      <input
                        type="text"
                        required
                        value={newImage.description}
                        onChange={e => setNewImage(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="A concise, informational caption detailing the event..."
                        className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-850 dark:text-white outline-none focus:ring-1 focus:ring-dairy-green-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Choose Image File</label>
                      <input
                        id="gallery-file-input"
                        type="file"
                        required
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="w-full text-xs text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-dairy-green-50 dark:file:bg-slate-900 file:text-dairy-green-700 dark:file:text-dairy-green-400 hover:file:bg-dairy-green-100 transition-all cursor-pointer"
                      />
                    </div>

                    {newImage.src && (
                      <div className="w-40 h-28 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-inner">
                        <img src={newImage.src} alt="Upload preview" className="w-full h-full object-cover" />
                      </div>
                    )}

                    {gallerySuccess && (
                      <div className="p-3 bg-dairy-green-50 dark:bg-dairy-green-950/20 text-dairy-green-700 dark:text-dairy-green-400 rounded-xl text-xs font-bold flex items-center space-x-1.5">
                        <CheckCircle className="w-4 h-4" />
                        <span>Gallery list updated. Image saved locally!</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={!newImage.src}
                      className="px-6 py-2.5 bg-dairy-green-700 hover:bg-dairy-green-600 disabled:bg-slate-400 text-white font-bold rounded-xl shadow-md text-xs cursor-pointer"
                    >
                      Publish Image
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminPanel;
